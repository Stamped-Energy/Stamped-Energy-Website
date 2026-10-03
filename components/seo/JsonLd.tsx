type JsonLdProps = {
  data: object | (object | null)[];
};

export function JsonLd({ data }: JsonLdProps) {
  const payload = (Array.isArray(data) ? data : [data]).filter(
    (item): item is object => item !== null,
  );

  return (
    <>
      {payload.map((item, index) => (
        <script
          // eslint-disable-next-line react/no-danger
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
