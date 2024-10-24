package com.tuanngp.upcycle_hub.common.filters;

import com.tuanngp.upcycle_hub.common.utils.JwtTokenUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    @Value("${api.prefix}")
    private String apiPrefix;
    private final UserDetailsService userDetailsService;
    private final JwtTokenUtils jwtTokenUtils;

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request,
                                    @NotNull HttpServletResponse response,
                                    @NotNull FilterChain filterChain)
            throws IOException {
        try {
            if (isBypassToken(request)) {
                filterChain.doFilter(request, response);
                return;
            }
            final String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return;
            }
            final String token = authHeader.substring(7);
            String username = jwtTokenUtils.getUsernameFromToken(token);
            if (username != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {
                validateAndAuthenticateToken(request, token, username);
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");

        }
    }

    private void validateAndAuthenticateToken(HttpServletRequest request, String token, String username) {
        User userDetail = (User) userDetailsService.loadUserByUsername(username);
        if (jwtTokenUtils.validateToken(token, userDetail)) {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetail, null, userDetail.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
    }

    private boolean isBypassToken(@NotNull HttpServletRequest request) {
        final List<Pair<String, String>> bypassTokens = Arrays.asList(
                Pair.of(String.format("%s/auth/register", apiPrefix), "POST"),
                Pair.of(String.format("%s/auth/login", apiPrefix), "POST")
//                Pair.of("/v3/api-docs", "GET"),
//                Pair.of("/swagger-ui", "GET"),
//                Pair.of("/swagger-ui.html", "GET")
        );
        String path = request.getServletPath();
        String method = request.getMethod().toUpperCase();
        return bypassTokens.stream().anyMatch(bypassToken ->
                path.contains(bypassToken.getFirst()) && method.equals(bypassToken.getSecond())
        );
    }
}
