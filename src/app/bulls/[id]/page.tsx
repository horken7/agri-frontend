
"use client"; // For using toast

import Image from "next/image";
import { useParams } from "next/navigation";
import { getBullById, type Bull } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 py-2">
      <dt className="font-medium text-muted-foreground">{label}</dt>
      <dd className="md:col-span-2">{value || "-"}</dd>
    </div>
  );
}


export default function BullDetailsPage() {
  const params = useParams();
  const { toast } = useToast();
  const [bull, setBull] = useState<Bull | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const id = typeof params.id === 'string' ? params.id : '';

  useEffect(() => {
    if (id) {
      const foundBull = getBullById(id);
      setBull(foundBull || null);
    }
    setIsLoading(false);
  }, [id]);


  const handleDownloadPdf = () => {
    toast({
      title: "PDF Download",
      description: "PDF generation is a complex feature and is currently not implemented. This button is a placeholder.",
      variant: "default",
    });
  };

  if (isLoading) {
    return (
       <div className="container mx-auto py-8 px-4 md:px-6">
          <PageHeader>
            <PageHeaderHeading>Loading Bull Details...</PageHeaderHeading>
          </PageHeader>
          <Card>
            <CardContent className="p-6 text-center">
              <p>Loading...</p>
            </CardContent>
          </Card>
       </div>
    );
  }

  if (!bull) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        <PageHeader>
          <Link href="/bulls" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bulls List
          </Link>
          <PageHeaderHeading>Bull Not Found</PageHeaderHeading>
          <PageHeaderDescription>
            The bull you are looking for could not be found.
          </PageHeaderDescription>
        </PageHeader>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <PageHeader>
         <Link href="/bulls" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bulls List
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <PageHeaderHeading>{bull.name} - {bull.id}</PageHeaderHeading>
            <PageHeaderDescription>
              Detailed information for bull {bull.name}.
            </PageHeaderDescription>
          </div>
          <Button onClick={handleDownloadPdf} variant="outline" className="mt-4 md:mt-0">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </PageHeader>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-1">
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-[4/3] relative w-full rounded-t-lg overflow-hidden">
                <Image
                  src={bull.imageUrl}
                  alt={bull.name}
                  fill
                  className="object-cover"
                  data-ai-hint={bull.imageHint}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{bull.name}</h3>
                <p className="text-sm text-muted-foreground">{bull.breed}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Bull Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-border">
                <DetailItem label="ID" value={bull.id} />
                <DetailItem label="Breed" value={bull.breed} />
                <DetailItem label="Date of Birth" value={new Date(bull.dateOfBirth).toLocaleDateString()} />
                <DetailItem label="Sire Name" value={bull.sireName} />
                <DetailItem label="Dam Name" value={bull.damName} />
                <DetailItem label="Health Status" value={bull.healthStatus} />
                <DetailItem label="Location" value={bull.location} />
                <DetailItem label="Owner" value={bull.owner} />
              </dl>
            </CardContent>
          </Card>

          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle>Genetic Merit</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-border">
                <DetailItem label="Fat %" value={bull.geneticMerit.fatPercentage.toFixed(1)} />
                <DetailItem label="Protein %" value={bull.geneticMerit.proteinPercentage.toFixed(1)} />
                <DetailItem label="Cell Count" value={bull.geneticMerit.cellCount.toLocaleString()} />
                <DetailItem label="Fertility Index" value={bull.geneticMerit.fertilityIndex} />
                <DetailItem label="Calving Ease" value={bull.geneticMerit.calvingEase} />
              </dl>
            </CardContent>
          </Card>
          
          {bull.notes && (
             <Card className="mt-8 shadow-lg">
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{bull.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
