<?php

namespace App\Services;

use GuzzleHttp\Client;

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

        if (session()->has('token')) {
            $headers['Authorization'] = 'Bearer ' . session('token');
        }

        return $headers;
    }

    public function get(string $uri, array $options = []): array
    {
        $response = $this->client->get($uri, [
            'headers' => array_merge($this->getDefaultHeaders(), $options['headers'] ?? []),
            'query' => $options['query'] ?? [],
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    public function post(string $uri, array $data = []): array
    {
        $response = $this->client->post($uri, [
            'headers' => $this->getDefaultHeaders(),
            'json' => $data,
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    public function put(string $uri, array $data = []): array
    {
        $response = $this->client->put($uri, [
            'headers' => $this->getDefaultHeaders(),
            'json' => $data,
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    public function delete(string $uri): array
    {
        $response = $this->client->delete($uri, [
            'headers' => $this->getDefaultHeaders(),
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
