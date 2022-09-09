export const Biography = ( content ) => {
    const text  = content.props;

    return (
      
      <p className="biography">
        {text}
      </p>
    );
  };