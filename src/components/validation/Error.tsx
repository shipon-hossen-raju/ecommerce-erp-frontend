type TProps = {
  message: string;
};

const Error = ({ message }: TProps) => {
  return (
    <>
      <div className="text-center text-sm px-1 py-2 my-1 text-[#b91c1c] bg-[#fee2e2] border border-[#fca5a5] rounded">
        {message}
      </div>
    </>
  );
};

export default Error;
