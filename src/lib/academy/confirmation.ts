/** Public Academy confirmation route — never append internal application UUIDs. */
export const ACADEMY_APPLICATION_RECEIVED_PATH =
  "/academy/application-received";

export function getAcademyApplicationReceivedPath() {
  return ACADEMY_APPLICATION_RECEIVED_PATH;
}
