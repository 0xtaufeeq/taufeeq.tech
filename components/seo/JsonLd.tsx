/** Renders schema.org structured data. `<` is escaped to prevent the JSON
 * payload from breaking out of the script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c')
          }}
        />
      ))}
    </>
  )
}
