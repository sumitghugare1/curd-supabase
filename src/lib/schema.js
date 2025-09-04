export const TABLES = {
  POSTS: 'posts',
  EVENTS: 'events',
  PRODUCTS: 'products',
  FAQS: 'faqs',
  SITE_SETTINGS: 'site_settings',
};

export const POST_FIELDS = {
  ID: 'id',
  CREATED_AT: 'created_at',
  TITLE: 'title',
  CONTENT: 'content',
  VIDEO_URL: 'video_url',
  VIDEO_NAME: 'video_name',
  VIDEO_DESCRIPTION: 'video_description',
  QA_QUESTION: 'qa_question',
  QA_ANSWER: 'qa_answer',
  META_TITLE: 'meta_title',
  META_DESCRIPTION: 'meta_description',
  META_KEYWORDS: 'meta_keywords',
  CANONICAL_URL: 'canonical_url',
  OG_IMAGE_URL: 'og_image_url',
};

export const EVENT_FIELDS = {
  ID: 'id',
  CREATED_AT: 'created_at',
  NAME: 'name',
  START_DATE: 'start_date',
  END_DATE: 'end_date',
  DESCRIPTION: 'description',
  LOCATION_URL: 'location_url',
  IMAGE_URL: 'image_url',
};

export const PRODUCT_FIELDS = {
  ID: 'id',
  CREATED_AT: 'created_at',
  NAME: 'name',
  DESCRIPTION: 'description',
  SKU: 'sku',
  BRAND_NAME: 'brand_name',
  PRICE: 'price',
  IMAGE_URL: 'image_url',
  AVAILABILITY: 'availability',
};

export const FAQ_FIELDS = {
  ID: 'id',
  CREATED_AT: 'created_at',
  QUESTION: 'question',
  ANSWER: 'answer',
  IS_ACTIVE: 'is_active',
};

