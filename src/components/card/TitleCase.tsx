interface props {
  title: string;
  text?: string;
}

export const TitleCase = ({ title, text }: props) => {
  return (
    <div className="flex flex-col gap-1 pb-2">
      <h1 className="font-bold 2xl:text-xl text-base text-primary">{title}</h1>
      {text ? <p className="font-light 2xl:text-sm text-xs">{text}</p> : null}
    </div>
  );
};
