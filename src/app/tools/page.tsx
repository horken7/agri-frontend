
import Image from "next/image";
import { tools, type Tool } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";

export default function ToolGalleryPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <PageHeader>
        <PageHeaderHeading>Tool Gallery</PageHeaderHeading>
        <PageHeaderDescription>
          Explore our wide range of agricultural tools and equipment.
        </PageHeaderDescription>
      </PageHeader>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {tools.map((tool: Tool) => (
          <Card key={tool.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="aspect-[3/2] relative w-full">
                <Image
                  src={tool.imageUrl}
                  alt={tool.name}
                  fill
                  className="object-cover"
                  data-ai-hint={tool.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-semibold mb-2">{tool.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {tool.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
