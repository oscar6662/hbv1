package is.hi.hbv501g.hbv1.Services;

import java.util.List;

import is.hi.hbv501g.hbv1.Persistence.Entities.Application;

public interface ApplicationListService {
    List<Application> getApplicationList(Long daycareWorkerId);
}
