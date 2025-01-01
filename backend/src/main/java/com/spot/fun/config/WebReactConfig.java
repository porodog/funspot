package com.spot.fun.config;

import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Log4j2
@Configuration
public class WebReactConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**")
            .addResourceLocations("classpath:/static/")
            .resourceChain(true)
            .addResolver(new PathResourceResolver() {
              @Override
              protected Resource getResource(String resourcePath, Resource location) throws IOException {
                Resource requestedResource = location.createRelative(resourcePath);

                // API 요청은 Spring으로 전달
                if (resourcePath.startsWith("api/")) {
                  return null;
                }

                // 정적 파일이 존재하면 해당 파일 반환
                if (requestedResource.exists() && requestedResource.isReadable()) {
                  return requestedResource;
                }

                // 그 외 모든 경우 (React 라우팅) index.html로 포워딩
                return new ClassPathResource("/static/index.html");
              }
            });
  }
}
