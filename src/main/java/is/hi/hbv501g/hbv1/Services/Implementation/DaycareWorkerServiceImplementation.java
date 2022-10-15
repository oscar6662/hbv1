package is.hi.hbv501g.hbv1.Services.Implementation;

import is.hi.hbv501g.hbv1.Persistence.Entities.Appetite;
import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Persistence.Repositories.DayReportRepository;
import is.hi.hbv501g.hbv1.Persistence.Repositories.DaycareWorkerRepository;
import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DaycareWorkerServiceImplementation implements DaycareWorkerService {
//    private List<DaycareWorker> daycareWorkerRepository = new ArrayList<>();
    private DaycareWorkerRepository daycareWorkerRepository;
    private DayReportRepository dayReportRepository;

    @Autowired
    public DaycareWorkerServiceImplementation(DaycareWorkerRepository daycareWorkerRepository) {
        this.daycareWorkerRepository = daycareWorkerRepository;
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
        return daycareWorkerRepository.findDaycareWorkerById(id);
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
