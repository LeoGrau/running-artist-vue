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
            :disabled="!selectedOffers || !selectedOffers.length"
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
        :value="offers"
        v-model:selection="selectedOffers"
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
            class="table-header flex flex-column md:flex-row md:justify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Manage Offers</h5>
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
          field="description"
          header="Description"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="points"
          header="Points"
          :sortable="true"
          style="min-width: 12rem"
        >
        </pv-column>
        <pv-column
          field="businessId"
          header="Business Id"
          :sortable="true"
          style="min-width: 12rem"
        >
        </pv-column>

        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click="editOffer(slotProps.data)"
            />
            <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="confirmDeleteOffer(slotProps.data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>
    <pv-dialog
      v-model:visible="offerDialog"
      :style="{ width: '450px' }"
      header="Offer Information"
      :modal="true"
      class="p-fluid"
    >
      <br />
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
            type="text"
            id="title"
            v-model.trim="offer.title"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !offer.title }"
          />
          <label for="title">Title</label>
          <small class="p-error" v-if="submitted && !offer.title"
            >Title is required.</small
          >
        </span>
      </div>
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
            id="description"
            v-model="offer.description"
            required="false"
            rows="2"
            cols="2"
          />
          <label for="description">Description</label>
        </span>
      </div>
      <div class="field">
        <label for="minmax-buttons">Points</label>
        <InputNumber
          id="points"
          v-model="offer.points"
          mode="decimal"
          showButtons
          :min="0"
          :max="100"
        />
      </div>
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
            id="businessId"
            v-model="offer.businessId"
            required="false"
            rows="2"
            cols="2"
          />
          <label for="description">Business Id</label>
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
          @click="saveOffer"
        />
      </template>
    </pv-dialog>
    <pv-dialog
      v-model:visible="deleteOfferDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="offer"
          >Are you sure you want to delete <b>{{ offer.title }}</b></span
        >
      </div>
      <template #footer>
        <pv-button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteOfferDialog = false"
        />
        <pv-button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteOffer"
        />
      </template>
    </pv-dialog>
    <pv-dialog
      v-model:visible="deleteOffersDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" syle="font-size: 2rem" />
        <span v-if="selectedOffers"
          >Are you sure you want to delete the selected tutorials?</span
        >
      </div>
      <template #footer>
        <pv-button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteOffersDialog = false"
        />
        <pv-button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedOffers"
        />
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import { OffersApiService } from "../services/offers-api.service";
import { FilterMatchMode } from "primevue/api";
export default {
  name: "tutorial-list",
  data() {
    return {
      offers: [],
      offerDialog: false,
      deleteOfferDialog: false,
      deleteOffersDialog: false,
      offer: {},
      selectedOffers: null,
      filters: {},
      submitted: false,
      /*      statuses: [
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],*/
      offersService: null,
    };
  },
  created() {
    this.offersService = new OffersApiService();
    this.offersService.getAll().then((response) => {
      this.offers = response.data;
      this.offers.forEach((tutorial) => this.getDisplayableOffer(tutorial));
      console.log(this.offers);
    });
    this.initFilters();
  },
  methods: {
    getDisplayableOffer(tutorial) {
      return tutorial;
    },
    getStorableOffer(displayableOffer) {
      return {
        id: displayableOffer.id,
        title: displayableOffer.title,
        description: displayableOffer.description,
        points: displayableOffer.points,
        businessId: displayableOffer.businessId,
      };
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    findIndexById(id) {
      return this.offers.findIndex((offer) => offer.id === id);
    },
    openNew() {
      this.offer = {};
      this.submitted = false;
      this.offerDialog = true;
    },
    hideDialog() {
      this.offerDialog = false;
      this.submitted = false;
    },
    saveOffer() {
      this.submitted = true;
      if (this.offer.title.trim()) {
        if (this.offer.id) {
          this.offer = this.getStorableOffer(this.offer);
          this.offersService
            .update(this.offer.id, this.offer)
            .then((response) => {
              this.offers[this.findIndexById(response.data.id)] =
                this.getDisplayableOffer(response.data);
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Tutorial Updated",
                life: 3000,
              });
              console.log(response);
            });
        } else {
          this.offer.id = 0;
          this.offer = this.getStorableOffer(this.offer);
          this.offersService.create(this.offer).then((response) => {
            this.offer = this.getDisplayableOffer(response.data);
            this.offers.push(this.offer);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Tutorial Created",
              life: 3000,
            });
            console.log(response);
          });
        }
      }
      this.offerDialog = false;
      this.offer = {};
    },
    editOffer(offer) {
      this.offer = { ...offer };
      this.offerDialog = true;
    },
    confirmDeleteOffer(offer) {
      this.offer = offer;
      this.deleteOfferDialog = true;
    },
    deleteOffer() {
      this.offersService.delete(this.offer.id).then((response) => {
        this.offers = this.offers.filter((t) => t.id !== this.offer.id);
        this.deleteOfferDialog = false;
        this.offer = {};
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Tutorial Deleted",
          life: 3000,
        });
        console.log(response);
      });
    },
    exportToCSV() {
      this.$refs.dt.exportCSV();
    },
    confirmDeleteSelected() {
      this.deleteOffersDialog = true;
    },
    deleteSelectedOffers() {
      this.selectedOffers.forEach((tutorial) => {
        this.offersService.delete(tutorial.id).then((response) => {
          this.offers = this.offers.filter((t) => t.id !== this.offer.id);
          console.log(response);
        });
      });
      this.deleteOffersDialog = false;
    },
  },
};
</script>

<style scoped></style>