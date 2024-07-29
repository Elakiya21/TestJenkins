import pluralize from "pluralize";

const ENTITY_TYPE = "header";
export const TYPE = `${pluralize(ENTITY_TYPE)}`;
export const config = {
  getHeaderFooter: {
    url: "/v1/store/{storeId}/header-and-footer",
    method: "GET",
  },
};
