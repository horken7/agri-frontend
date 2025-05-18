
import { bulls } from "@/lib/data";
import { BullsTable } from "./bulls-table";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";

export default function BullsListPage() {
  // In a real app, fetch data here
  const allBulls = bulls;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <PageHeader>
        <PageHeaderHeading>Bulls Directory</PageHeaderHeading>
        <PageHeaderDescription>
          Browse and manage your herd's bull data.
        </PageHeaderDescription>
      </PageHeader>
      <BullsTable bulls={allBulls} />
    </div>
  );
}
