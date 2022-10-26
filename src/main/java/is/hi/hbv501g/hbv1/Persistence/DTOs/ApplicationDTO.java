package is.hi.hbv501g.hbv1.Persistence.DTOs;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Helper Object for working with request bodies for daycareworkcer Applications
 */

public class ApplicationDTO {
    private Long id;
    private Long daycareWorkerId;
    private Long parentId;
    private Long[] childrenId;

    public ApplicationDTO(Long daycareWorkerId, Long parentId, Long[] chilrenId) {
        this.daycareWorkerId = daycareWorkerId;
        this.parentId = parentId;
        this.childrenId = chilrenId;
    }

    public Long getDaycareWorkerId() {
        return daycareWorkerId;
    }
    public void setDaycareWorkerId(Long daycareWorkerId) {
        this.daycareWorkerId = daycareWorkerId;
    }
    public Long getParentId() {
        return parentId;
    }
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Long[] getChildrenId() {
        return childrenId;
    }
}
