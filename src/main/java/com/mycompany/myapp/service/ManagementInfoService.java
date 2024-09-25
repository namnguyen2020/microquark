package com.mycompany.myapp.service;

import com.mycompany.myapp.config.JHipsterProperties;
import com.mycompany.myapp.service.dto.ManagementInfoDTO;
import io.quarkus.runtime.configuration.ConfigUtils;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.StringJoiner;

/**
 * Provides information for management/info resource
 */
@ApplicationScoped
public class ManagementInfoService {

    private final JHipsterProperties jHipsterProperties;

    @Inject
    public ManagementInfoService(JHipsterProperties jHipsterProperties) {
        this.jHipsterProperties = jHipsterProperties;
    }

    public ManagementInfoDTO getManagementInfo() {
        var info = new ManagementInfoDTO();
        if (jHipsterProperties.info().swagger().enable()) {
            info.activeProfiles.add("swagger");
        }
        info.activeProfiles.addAll(ConfigUtils.getProfiles());
        var joiner = new StringJoiner(",");
        ConfigUtils.getProfiles().forEach(joiner::add);
        info.displayRibbonOnProfiles = joiner.toString();
        return info;
    }
}
