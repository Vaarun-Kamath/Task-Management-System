import java.util.Date;

class Project {
    private String projectId;
    private String name;
    private String description;
    private Date deadline;
    // Collaborator Object
    private Date createdOn;
    // Collaborators list
    // Task Object
    private Backlog backlog;
    private Timeline timeline;
    // Statistics

    // Getter methods

    public String getProjectId() {
        return this.projectId;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public Date getDeadline() {
        return this.deadline;
    }

    public Date getCreatedOn() {
        return this.createdOn;
    }

    public Backlog getBacklog() {
        return this.backlog;
    }

    public Timeline getTimeline() {
        return this.timeline;
    }

    // Setter methods

    public void setName(String new_name) {
        this.name = new_name;
    }

    public void setDescription(String new_desc) {
        this.description = new_desc;
    }

    public void setDeadline(Date new_date) {
        this.deadline = new_date;
    }

    public void setBacklog(Backlog new_backlog) {
        this.backlog = new_backlog;
    }

    public void setTimeline(Timeline new_timeline) {
        this.timeline = new_timeline;
    }
}

// Temporary
class Backlog {
    int temp;
}

// Temporary
class Timeline {
    int temp;
}