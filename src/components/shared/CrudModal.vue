/**reportes */
/**proyectos */
<script>
export default {
  name: "Project",
  data() {
    const today = new Date();
    const mindate = new Date(today);
    mindate.setDate(mindate.getDate() - 3);
    return {
      actualProject: NaN,
      newProject: {
        projectid: "",
        project: "",
        labdate: "",
        prodate: "",
        source: "",
        status: "",
      },
      fieldValidation: {
        projectid: false,
        project: false,
        labdate: false,
        prodate: false,
        source: false,
        status: false,
      },
      min: mindate,
      max: today,
      opccrud: "",
      projectlist: this.$parent.projects,
      projectstages: this.$parent.projectstages,
      pageitemlist: this.$parent.pageitemlist,
    };
  },
  methods: {
    deleteproject(project) {
      this.projectlist.splice(this.projectlist.indexOf(project), 1);
    },
    datedit(project) {
      this.opccrud = "Modificación";
      this.newProject = { ...project };
      this.actualProject = this.projectlist.indexOf(project);
    },
    resetcrud() {
      this.newProject = {
        projectid: "",
        project: "",
        labdate: "",
        prodate: "",
        source: "",
        status: "",
      };
      this.actualProject = NaN;
      // Restablece todos los estados de validación a falso
      for (const field in this.fieldValidation) {
        this.fieldValidation[field] = false;
      }
      this.actualProyect = NaN;
    },
    // Valida que no esté vacío
    validateField(value, fieldName) {
      switch (fieldName) {
        case "projectid":
          this.fieldValidation.projectid = value.length > 0;
          break;
        case "project":
          this.fieldValidation.project = value.length > 0;
          break;
        case "labdate":
          this.fieldValidation.labdate = value.length > 0;
          break;
        case "prodate":
          this.fieldValidation.prodate = value.length > 0;
          break;
        case "source":
          this.fieldValidation.source = value.length > 0;
          break;
        case "status":
          this.fieldValidation.status = value.length > 0;
          break;
      }
    },
    processcrud() {
      let valid = true;
      // Validar que ningun campo esté vacío
      this.validateField(this.newProject.projectid, "projectid");
      this.validateField(this.newProject.project, "project");
      this.validateField(this.newProject.labdate, "labdate");
      this.validateField(this.newProject.prodate, "prodate");
      this.validateField(this.newProject.source, "source");
      this.validateField(this.newProject.status, "status");
      const isValid = Object.values(this.fieldValidation).every(
        (valid) => valid
      );
      if (isValid) {
        if (this.opccrud == "Creación") {
          this.projectlist.push({ ...this.newProject });
        } else if (this.opccrud == "Modificación") {
          this.projectlist[this.actualProject] = { ...this.newProject };
        }
        $("#activityModal").modal("hide");
        this.resetcrud();
      }
    },
  },
};
</script>
