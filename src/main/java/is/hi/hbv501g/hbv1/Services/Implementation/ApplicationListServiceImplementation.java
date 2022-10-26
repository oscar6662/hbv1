package is.hi.hbv501g.hbv1.Services.Implementation;
import is.hi.hbv501g.hbv1.Services.ApplicationListService;
import java.util.List;

import org.springframework.stereotype.Service;

import is.hi.hbv501g.hbv1.Persistence.Entities.Application;
import is.hi.hbv501g.hbv1.Persistence.Repositories.DaycareWorkerApplicationRepository;

@Service
public class ApplicationListServiceImplementation implements ApplicationListService {
    private DaycareWorkerApplicationRepository daycareWorkerApplicationRepository;

    public List<Application> getApplicationList(Long id) {
        return daycareWorkerApplicationRepository.findByDaycareWorkerId(id);

    }
    
}
