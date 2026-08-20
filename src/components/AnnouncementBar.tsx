import { getOfferTexts } from "@/lib/cms";
import AnnouncementBarClient from "./AnnouncementBarClient";

export default async function AnnouncementBar() {
  // Rotating offer texts (text + icon image) come from the dashboard.
  const offers = await getOfferTexts();

  return <AnnouncementBarClient offers={offers} />;
}
