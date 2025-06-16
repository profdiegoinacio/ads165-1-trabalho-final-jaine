package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;

@Service
public class GeocodingService {

    public record NominatimResponse(double lat, double lon) {}

    public double[] geocode(String enderecoCompleto) {
        RestTemplate restTemplate = new RestTemplate();
        URI uri = UriComponentsBuilder.fromUriString("https://nominatim.openstreetmap.org/search")
                .queryParam("q", enderecoCompleto)
                .queryParam("format", "json")
                .queryParam("limit", 1)
                .build().toUri();

        try {
            NominatimResponse[] resposta = restTemplate.getForObject(uri, NominatimResponse[].class);
            if (resposta != null && resposta.length > 0) {
                return new double[]{Double.parseDouble(resposta[0].lat + ""), Double.parseDouble(resposta[0].lon + "")};
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new double[]{0.0, 0.0}; // fallback
    }
}
