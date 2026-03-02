<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Exception\SessionException;

class ApiService
{
    protected Client $client;
    protected string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.api.base_url', 'http://localhost:8000/api/v1');
        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout' => 30,
            'headers' => $this->getDefaultHeaders(),
        ]);
    }

    protected function getDefaultHeaders(): array
    {
        $headers = [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ];

        try {
            if (Session::has('token')) {
                $headers['Authorization'] = 'Bearer ' . Session::get('token');
            }
        } catch (SessionException $e) {
            // Session not available
        }

        return $headers;
    }

    protected function getAuthHeaders(): array
    {
        try {
            if (Session::has('token')) {
                return [
                    'Authorization' => 'Bearer ' . Session::get('token'),
                ];
            }
        } catch (SessionException $e) {
            // Session not available
        }

        return [];
    }

    public function get(string $uri, array $options = []): array
    {
        try {
            $response = $this->client->get($uri, [
                'headers' => array_merge($this->getDefaultHeaders(), $options['headers'] ?? []),
                'query' => $options['query'] ?? [],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (GuzzleException $e) {
            return $this->handleError($e);
        }
    }

    public function post(string $uri, array $data = []): array
    {
        try {
            $response = $this->client->post($uri, [
                'headers' => array_merge($this->getDefaultHeaders(), $this->getAuthHeaders()),
                'json' => $data,
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (GuzzleException $e) {
            return $this->handleError($e);
        }
    }

    public function put(string $uri, array $data = []): array
    {
        try {
            $response = $this->client->put($uri, [
                'headers' => array_merge($this->getDefaultHeaders(), $this->getAuthHeaders()),
                'json' => $data,
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (GuzzleException $e) {
            return $this->handleError($e);
        }
    }

    public function delete(string $uri): array
    {
        try {
            $response = $this->client->delete($uri, [
                'headers' => array_merge($this->getDefaultHeaders(), $this->getAuthHeaders()),
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (GuzzleException $e) {
            return $this->handleError($e);
        }
    }

    protected function handleError(GuzzleException $e): array
    {
        $response = $e->getResponse();
        $statusCode = $response ? $response->getStatusCode() : 500;
        $body = $response ? $response->getBody()->getContents() : '{}';

        return [
            'success' => false,
            'status_code' => $statusCode,
            'message' => json_decode($body, true)['message'] ?? $e->getMessage(),
            'errors' => json_decode($body, true)['errors'] ?? [],
        ];
    }
}
