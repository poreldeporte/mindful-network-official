
interface Props {
  id: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Section({ children, id }: Props) {
  return (
    <section id={id} className="py-10 px-10 lg:rounded-2xl my-10 bg-white shadow-sm shadow-gray-100">
        {children}
    </section>
  );
}

export const SectionContent = ({children}: {children:React.ReactNode}) => {
  return (
    <div className="lg:flex gap-20 mt-10">{children}</div>
  )
}

export const SectionHeader = ({children}: {children:React.ReactNode}) => {
  return (
    <div className="flex items-center space-x-3 border-b pb-5 border-gray-200">
        {children}
      </div>
  )
}
