//package com.example.config;
//
//import java.util.*;
//
//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.reactive.CorsWebFilter;
//import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
//import org.springframework.http.HttpMethod;
//
//@Configuration
//public class RouterConfig {
//
//    @Bean
//    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
//
//        return builder.routes()
//
//            // USER SERVICE
//            .route("blossomBeauty-backend", r -> r
//                .path(
//                    "/api/users/**"
//                )
//                .and()
//                .method(HttpMethod.POST, HttpMethod.GET)
//                .uri("http://localhost:8084")               
//                //.uri("lb://blossomBeauty-backend")
//            )
//
//           // PRODUCT SERVICE
//            .route("RestAPI_ProductService", r -> r
//            	    .path("/api/products/**")
//            	    .and()
//                    .method(HttpMethod.POST, HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE)
//            	    .uri("http://localhost:8082")
//            	)
//
//            // CART SERVICE
//            .route("RestAPI_CartService", r -> r
//                .path("/api/cart/**")
//                .and()
//                .method(HttpMethod.POST, HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE)
//                .uri("http://localhost:8081")
//                //.uri("lb://RestAPI_CartService")
//            )
// 
//            // ORDER SERVICE
//            .route("RestAPI_OrderService", r -> r
//                .path("/orders/**")
//                .and()
//                .method(HttpMethod.POST, HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE)
//                .uri("http://localhost:8083")
//                //.uri("lb://RestAPI_OrderService")
//            )
//            
//            //WISHLIST SERVICE
//            .route("wishlist-service", r -> r
//            	    .path("/api/wishlist/**")
//            	    .and()
//            	    .method(HttpMethod.POST, HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE)
//            	    .uri("http://localhost:7232") // backend URL
//            	)
//
//
//           
//
//            
//
//            .build();
//    }
//
//    @Bean
//    public CorsWebFilter corsWebFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//
//        config.setAllowCredentials(true);
//        config.setAllowedOrigins(List.of("http://localhost:3000"));
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(List.of("*"));
//        config.setExposedHeaders(List.of("Authorization"));
//
//        source.registerCorsConfiguration("/**", config);
//        return new CorsWebFilter(source);
//    }
//}/



package com.example.config;

import java.util.List;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class RouterConfig {

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {

        return builder.routes()

            // USER SERVICE
            .route("blossomBeauty-backend", r -> r
                .path("/api/users/**")
                .and().method(HttpMethod.POST, HttpMethod.GET)
                .uri("http://localhost:8084")
            )

            // PRODUCT SERVICE
            .route("RestAPI_ProductService", r -> r
                .path("/api/products/**")
                .and().method(HttpMethod.POST, HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE)
                .uri("http://localhost:8082")
            )

            // CART SERVICE
            .route("RestAPI_CartService", r -> r
                .path("/api/cart/**")
                .and().method(HttpMethod.POST, HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE)
                .uri("http://localhost:8081")
            )

            // ORDER SERVICE
            .route("RestAPI_OrderService", r -> r
                .path("/orders/**")
                .and().method(HttpMethod.POST, HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE)
                .uri("http://localhost:8083")
            )

            // WISHLIST SERVICE
            .route("wishlist-service", r -> r
                .path("/api/wishlist/**")
                .and().method(HttpMethod.POST, HttpMethod.GET, HttpMethod.PUT, HttpMethod.DELETE)
                .uri("http://localhost:7232")
            )

            .build();
    }

    // ✅ Proper CORS configuration
    @Bean
    public CorsWebFilter corsWebFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:3000")); // only one origin
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));

        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }
}

