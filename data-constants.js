module.exports = {
  block: {
    title: { "data-block-field": "title", "data-type": "string", "data-format-type": "string_textfield" },
    desc: { "data-block-field": "description", "data-type": "text_long", "data-form-type": "text_textarea", "data-format-type": "text_default" },
    image: { "data-block-field": "name", "data-type": "image", "data-form-type": "image_image", "data-format-type": "image" },
    link: { "data-block-field": "name", "data-type": "link", "data-form-type": "link_default", "data-format-type": "link" },
    view: {"data-view": "teams", "data-filter-type": "node", "data-filter-bundle": "team", "data-block-field": "teams_view", "data-target-type": "view", "data-target-bundle": "teams", "data-type": "entity_reference", "data-form-type": "entity_reference_autocomplete", "data-format-type": "entity_reference_entity_id" },
    dataView: { "data-filter-type": "node", "data-filter-bundle": "job", "data-block-field": "job_listings", "data-type": "entity_reference", "data-form-type": "entity_reference_autocomplete", "data-format-type": "entity_reference_entity_id", "data-target-type": "view", "data-target-bundle": "job_listings" },
    form: { "data-block-field": "form", "data-type": "entity_reference", "data-form-type": "entity_reference_autocomplete", "data-format-type": "entity_reference_entity_view", "data-target-type": "contact_form", "data-target-bundle": "corporate_requests", "data-form": "corporate_requests" },
    footerlink:  { "data-block-field": "facebook_link", "data-type": "link", "data-form-type": "link_class_field_widget", "data-format-type": "link_only_formatter" },
  },
  form: {
    form: { "data-form": "email_form" },
    text: { "data-form-field": "name", "data-type": "string", "data-form-type": "string_textfield", "data-format-type": "string" },
    email: { "data-form-field": "email", "data-type": "email", "data-form-type": "email_default", "data-format-type": "basic_string" },
  },
  menu: {
    menu: { "data-menu": "main-menu", "data-field": "menu", "data-type": "entity_reference", "data-form-type": "entity_reference_autocomplete", "data-format-type": "entity_reference_entity_id", "data-target-type": "menu", "data-target-bundle": "main-menu" },
    view:  { "data-view": "communities", "data-filter-type": "node", "data-filter-bundle": "community" },
    dataViewMode: { "data-node": "community", "data-view-mode": "card" },
  },
  node: {
    node: { "data-node": "community" },
    title: { "data-node-field": "title", "data-type": "string", "data-form-type": "string_textfield", "data-format-type": "string" },
    description:  { "data-node-field": "description", "data-type": "string_long", "data-form-type": "string_textarea", "data-format-type": "basic_string" },
    image: { "data-node-field": "name", "data-type": "image", "data-form-type": "image_image", "data-format-type": "image" },
    link: { "data-node-field": "name", "data-type": "link", "data-form-type": "link_default", "data-format-type": "link" },
    interger: { "data-node-field": "title", "data-type": "integer", "data-form-type": "number", "data-format-type": "number_integer" },
    view: { "data-view": "area_amenities", "data-filter-type": "node", "data-filter-bundle": "amenity" },
  },
};
