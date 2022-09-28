package is.hi.hbv501g.hbv1.Services.Implementation;

import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import org.springframework.beans.factory.annotation.Autowired;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class DaycareWorkerServiceImplementation implements DaycareWorkerService {
    private List<DaycareWorker> daycareWorkerRepository = new ArrayList<>();

    @Autowired
    public DaycareWorkerServiceImplementation() {
        // create 3 random dcw for our dummy repo, removed when jpa added
        daycareWorkerRepository.add(
                new DaycareWorker("0101803333",
                        "Guðrún Jónsdóttir",
                        "Guðrún",
                        "Jónsdóttir",
                        "8885522",
                        10,
                        "Guðrúnargata 18",
                        "Reykjavík",
                        101));
        daycareWorkerRepository.add(
                new DaycareWorker("1010556623",
                        "Bjarni Guðmundsson",
                        "Bjarni",
                        "Guðmundsson",
                        "9996663",
                        2,
                        "Langabrekka 7",
                        "Kópavogur",
                        200));
        daycareWorkerRepository.add(
                new DaycareWorker("2315648212",
                        "Dagbjört Þorgrímsdóttir",
                        "Dagbjört",
                        "Þorgrímsdóttir",
                        "2651111",
                        8,
                        "Hlíðarhjalli 66",
                        "Kópavogur",
                        200));

        // jpa adds the id but here we do it manually
        for (DaycareWorker d: daycareWorkerRepository) {
            d.setId(UUID.randomUUID());
        }
    }

    @Override
    public List<DaycareWorker> findByLocation(String location) {
        List<DaycareWorker> list = new ArrayList<>();
        for(DaycareWorker d: daycareWorkerRepository) {
            if(d.getLocation().equals(location)) {
                list.add(d);
            }
        }
        return list;
    }

    @Override
    public List<DaycareWorker> findByLocationCode(int locationCode) {
        List<DaycareWorker> list = new ArrayList<>();
        for(DaycareWorker d: daycareWorkerRepository) {
            if(d.getLocationCode() == locationCode) {
                list.add(d);
            }
        }
        return list;
    }

    @Override
    public List<DaycareWorker> findAll() {
        return daycareWorkerRepository;
    }

    @Override
    public DaycareWorker addDaycareWorker(DaycareWorker daycareWorker) {
        daycareWorker.setId(UUID.randomUUID());
        daycareWorkerRepository.add(daycareWorker);
        return daycareWorker;
    }

    @Override
    public void delete(DaycareWorker daycareWorker) {
        daycareWorkerRepository.remove(daycareWorker);
    }
}
