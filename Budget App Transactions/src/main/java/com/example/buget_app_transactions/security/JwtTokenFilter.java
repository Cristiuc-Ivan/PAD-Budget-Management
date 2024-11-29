package com.example.buget_app_transactions.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {
  private final JwtTokenValidator jwtTokenValidator;

  public JwtTokenFilter(JwtTokenValidator jwtTokenValidator) {
    this.jwtTokenValidator = jwtTokenValidator;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                  FilterChain filterChain) throws ServletException, IOException {
    try {
      String token = getTokenFromRequest(request);
      
      if (token != null && jwtTokenValidator.validateToken(token)) {
        String email = jwtTokenValidator.getEmailFromToken(token);
        
        // Create authorities
        List<GrantedAuthority> authorities = Collections.singletonList(
          new SimpleGrantedAuthority("ROLE_USER")
        );
        
        // Create authentication token with proper authorities
        UsernamePasswordAuthenticationToken authentication =
          new UsernamePasswordAuthenticationToken(email, null, authorities);
          
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } catch (Exception e) {
      // Handle exception
    }
    
    filterChain.doFilter(request, response);
  }

  private String getTokenFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }
}
