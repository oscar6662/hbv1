package is.hi.hbv501g.hbv1.Services.Implementation;

import is.hi.hbv501g.hbv1.Persistence.Entities.Application;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Persistence.Repositories.DayReportRepository;
import is.hi.hbv501g.hbv1.Persistence.Repositories.DaycareWorkerApplicationRepository;
import is.hi.hbv501g.hbv1.Persistence.Repositories.DaycareWorkerRepository;
import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The main service used by routes that handle Daycare Workers. It uses the
 * DaycareWorker repository as well as the DayReport repository.
 */
@Service
public class DaycareWorkerServiceImplementation implements DaycareWorkerService {
    // private List<DaycareWorker> daycareWorkerRepository = new ArrayList<>();
    private DaycareWorkerRepository daycareWorkerRepository;
    private DaycareWorkerApplicationRepository daycareWorkerApplicationRepository;
    private DayReportRepository dayReportRepository;

    @Autowired
    public DaycareWorkerServiceImplementation(DaycareWorkerRepository daycareWorkerRepository,
                                              DaycareWorkerApplicationRepository daycareWorkerApplicationRepository, DayReportRepository dayReportRepository) {
        this.daycareWorkerRepository = daycareWorkerRepository;
        this.daycareWorkerApplicationRepository = daycareWorkerApplicationRepository;
        this.dayReportRepository = dayReportRepository;
    }

    @Override
    public List<DaycareWorker> findByLocation(String location) {
        return daycareWorkerRepository.findByLocation(location);
    }

    @Override
    public List<DaycareWorker> findByLocationCode(String locationCode) {
        return daycareWorkerRepository.findByLocationCode(locationCode);
    }

    @Override
    public DaycareWorker findDaycareWorkerById(Long id) {
        System.out.println(id);
        return daycareWorkerRepository.findDaycareWorkerById(id);
    }

    @Override
    public DaycareWorker findDaycareWorkerByEmail(String email) {
        return daycareWorkerRepository.findDaycareWorkerByEmail(email);
    }

    @Override
    public Application applyForDaycareWorker(Application application) {
        return daycareWorkerApplicationRepository.save(application);
    }

    @Override
    public List<DaycareWorker> findAll() {
        return daycareWorkerRepository.findAll();
    }

    @Override
    public DaycareWorker addDaycareWorker(DaycareWorker daycareWorker) {
        daycareWorkerRepository.save(daycareWorker);
        return daycareWorker;
    }

    @Override
    public DayReport createDayReport(DayReport dayReport) {
        return dayReportRepository.save(dayReport);
    }

    @Override
    public void delete(DaycareWorker daycareWorker) {
        daycareWorkerRepository.delete(daycareWorker);
    }
}
