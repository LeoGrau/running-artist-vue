<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-4">
        <template #start>
          <pv-button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
          <pv-button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedChallenges || !selectedChallenges.length"
          />
        </template>
        <template #end>
          <pv-button
            label="Export"
            icon="pi pi-upload"
            class="p-button-help"
            @click="exportToCSV($event)"
          />
        </template>
      </pv-toolbar>
      <pv-data-table
        ref="dt"
        :value="challenges"
        v-model:selection="selectedChallenges"
        dataKey="id"
        :paginator="true"
        :rows="5"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tutorials"
        responsiveLayout="scroll"
      >
        <template #header>
          <div
            class="
              table-header
              flex flex-column
              md:flex-row md:justify-content-between
            "
          >
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">
              Manage challenges
            </h5>
            <span class="p-input-icon-left"
              ><i class="pi pi-search" /><pv-input-text
                v-model="filters['global'].value"
                placeholder="Search..."
              />
            </span>
          </div>
        </template>
        <pv-column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></pv-column>
        <pv-column
          field="id"
          header="Id"
          :sortable="true"
          style="min-width: 12rem"
        ></pv-column>
        <pv-column
          field="title"
          header="Title"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="businessId"
          header="Business Id"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="urlToImage"
          header="URL To Image"
          :sortable="true"
          style="min-width: 12rem"
        >
        </pv-column>
        <pv-column
          field="challengeType"
          header="Challenge Type"
          :sortable="true"
          style="min-width: 12rem"
        >
        </pv-column>

        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click="editChallenge(slotProps.data)"
            />
            <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="confirmDeleteChallenge(slotProps.data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>
    <pv-dialog
      v-model:visible="challengeDialog"
      :style="{ width: '450px' }"
      header="Challenge Information"
      :modal="true"
      class="p-fluid"
    >
      <br />
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
            type="text"
            id="title"
            v-model.trim="challenge.title"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !challenge.title }"
          />
          <label for="title">Title</label>
          <small class="p-error" v-if="submitted && !challenge.title"
            >Title is required.</small
          >
        </span>
      </div>
      <div class="field">
        <span class="p-float-label">
          <pv-input-number
            id="businessId"
            v-model="challenge.businessId"
            required="false"
            rows="2"
            cols="2"
          />
          <label for="description">BusinessId</label>
        </span>
      </div>
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
            id="urlToImage"
            v-model="challenge.urlToImage"
            required="false"
            rows="2"
            cols="2"
          />
          <label for="urlToImage">URL To Image</label>
        </span>
      </div>
      <div class="field">
        <span class="p-float-label">
          <pv-dropdown
            id="challengeType"
            v-model="challenge.challengeType"
            :options = "['Individual','Team']"
            required="true"
            rows="2"
            cols="2"
          />
          <label for="description">Challenge Type</label>
        </span>
      </div>

      <template #footer>
        <pv-button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <pv-button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveChallenge"
        />
      </template>
    </pv-dialog>
    <pv-dialog
      v-model:visible="deleteChallengeDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="challenge"
          >Are you sure you want to delete <b>{{ challenge.title }}</b></span
        >
      </div>
      <template #footer>
        <pv-button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteChallengeDialog = false"
        />
        <pv-button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteChallenge"
        />
      </template>
    </pv-dialog>
    <pv-dialog
      v-model:visible="deleteChallengesDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" syle="font-size: 2rem" />
        <span v-if="selectedChallenges"
          >Are you sure you want to delete the selected tutorials?</span
        >
      </div>
      <template #footer>
        <pv-button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteChallengesDialog = false"
        />
        <pv-button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedChallenges"
        />
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import { ChallengesApiService } from "../services/challenges-api.service";
import { FilterMatchMode } from "primevue/api";
export default {
  name: "challenge-list",
  data() {
    return {
      challenges: [],
      challengeDialog: false,
      deleteChallengeDialog: false,
      deleteChallengesDialog: false,
      challenge: {},
      selectedChallenges: null,
      filters: {},
      submitted: false,
      /*      statuses: [
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],*/
      challengesService: null,
    };
  },
  created() {
    this.challengesService = new ChallengesApiService();
    this.challengesService.getAll().then((response) => {
      this.challenges = response.data;
      this.challenges.forEach((challenge) =>
        this.getDisplayableChallenge(challenge)
      );
      console.log(this.challenges);
    });
    this.initFilters();
  },
  methods: {
    getDisplayableChallenge(challenge) {
      return challenge;
    },
    getStorableChallenge(displayableChallenge) {
      return {
        id: displayableChallenge.id,
        title: displayableChallenge.title,
        businessId: displayableChallenge.businessId,
        urlToImage: displayableChallenge.urlToImage,
        challengeType: displayableChallenge.challengeType,
      };
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    findIndexById(id) {
      return this.challenges.findIndex((challenge) => challenge.id === id);
    },
    openNew() {
      this.challenge = {};
      this.submitted = false;
      this.challengeDialog = true;
    },
    hideDialog() {
      this.challengeDialog = false;
      this.submitted = false;
    },
    saveChallenge() {
      this.submitted = true;
      if (this.challenge.title.trim()) {
        if (this.challenge.id) {
          this.challenge = this.getStorableChallenge(this.challenge);
          this.challengesService
            .update(this.challenge.id, this.challenge)
            .then((response) => {
              this.challenges[this.findIndexById(response.data.id)] =
                this.getDisplayableChallenge(response.data);
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "challenge Updated",
                life: 3000,
              });
              console.log(response);
            });
        } else {
          this.challenge.id = 0;
          this.challenge = this.getStorableChallenge(this.challenge);
          this.challengesService.create(this.challenge).then((response) => {
            this.challenge = this.getDisplayableChallenge(response.data);
            this.challenges.push(this.challenge);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "challenge Created",
              life: 3000,
            });
            console.log(response);
          });
        }
      }
      this.challengeDialog = false;
      this.challenge = {};
    },
    editChallenge(challenge) {
      this.challenge = { ...challenge };
      this.challengeDialog = true;
    },
    confirmDeleteChallenge(challenge) {
      this.challenge = challenge;
      this.deleteChallengeDialog = true;
    },
    deleteChallenge() {
      this.challengesService.delete(this.challenge.id).then((response) => {
        this.challenges = this.challenges.filter(
          (t) => t.id !== this.challenge.id
        );
        this.deleteChallengeDialog = false;
        this.challenge = {};
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "challenge Deleted",
          life: 3000,
        });
        console.log(response);
      });
    },
    exportToCSV() {
      this.$refs.dt.exportCSV();
    },
    confirmDeleteSelected() {
      this.deleteChallengesDialog = true;
    },
    deleteSelectedChallenges() {
      this.selectedChallenges.forEach((challenge) => {
        this.challengesService.delete(challenge.id).then((response) => {
          this.challenges = this.challenges.filter(
            (t) => t.id !== this.challenge.id
          );
          console.log(response);
        });
      });
      this.deleteChallengesDialog = false;
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped></style>