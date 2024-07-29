import pluralize from "pluralize"

const ENTITY_TYPE = "magicLink"
export const TYPE = `${pluralize(ENTITY_TYPE)}`
export const config = {
  getMagicLinkDetails: {
    url: "/v1/magic-link-event/{id}",
    method: "GET",
  },

}

export const registrationForm = `magicLink`
