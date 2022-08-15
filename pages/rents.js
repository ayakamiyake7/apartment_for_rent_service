import { withRouter } from "next/router";
import React from "react";

const Rents = withRouter((props) => (
  <>
    <div>{`id: ${props.router.query.id} page`}</div>
    <p>This is rent id page</p>
    {console.log(props)}
  </>
));

export default Rents;
