package is.hi.hbv501g.hbv1.Services.Implementation;

import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Persistence.Repositories.DaycareWorkerRepository;
import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
public class DaycareWorkerServiceImplementation implements DaycareWorkerService {
//    private List<DaycareWorker> daycareWorkerRepository = new ArrayList<>();
    private DaycareWorkerRepository daycareWorkerRepository;

    @Autowired
    public DaycareWorkerServiceImplementation(DaycareWorkerRepository daycareWorkerRepository) {
        // create 3 random dcw for our dummy repo, remove when jpa is added
        this.daycareWorkerRepository = daycareWorkerRepository;
    }

    @Override
    public List<DaycareWorker> findByLocation(String location) {
        return daycareWorkerRepository.findByLocation(location);
    }

    @Override
    public List<DaycareWorker> findByLocationCode(int locationCode) {
        return daycareWorkerRepository.findByLocationCode(locationCode);
    }

    @Override
    public Optional<DaycareWorker> findById(Long id) {
        return daycareWorkerRepository.findById(id);
    }

    @Override
    public List<DaycareWorker> findAll() {
        return daycareWorkerRepository.findAll();
    }

    @Override
    public DaycareWorker addDaycareWorker(DaycareWorker daycareWorker) {
        daycareWorkerRepository.addDaycareWorker(daycareWorker);
        return daycareWorker;
    }

    @Override
    public void delete(Optional<DaycareWorker> daycareWorker) {
        System.out.println("Delete" + daycareWorker);
        daycareWorkerRepository.delete(daycareWorker);
    }

}
