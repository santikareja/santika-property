interface PropertyDescriptionProps {
  description: string;
  features: string[];
}

export default function PropertyDescription({
  description,
  features,
}: PropertyDescriptionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Deskripsi</h2>
        <div className="prose max-w-none">
          {description.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {features.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Fasilitas</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}