import React, {Fragment} from "react";

const Firstcol = ({isPoolish, percentLevain}) => {
    // console.log("percentLevain", percentLevain);
    if(isPoolish){
        return <Fragment>
        <div className="base">Poolish</div>
        <div className="base">Pétrissée</div>
      </Fragment>
    }
    if(percentLevain > 0){
        return <Fragment>
        <div className="base">Petrain</div>
        <div className="base">Pétrissée</div>
      </Fragment>
    }
    return <div className="base">Recette de base</div>;
}

const Secondcol = ({isPoolish, percentLevain}) => {
    if(isPoolish){
        return <Fragment>
        <div className="base">Poolish</div>
        <div className="base">Pétrissée</div>
      </Fragment>
    }
    if(percentLevain > 0){
        return <Fragment>
        <div className="base">Levain</div>
        <div className="base">Pétrissée</div>
      </Fragment>
    }
    return <div className="base">Recette </div>;
}

const Entete = ({isPoolish, percentLevain}) => {

    return <li className="header">
      <label>Ingrédients</label>
      <Firstcol isPoolish={isPoolish} percentLevain={percentLevain} />
      <div className="coef">Coef</div>
      <Secondcol isPoolish={isPoolish} percentLevain={percentLevain} />
    </li>;
}

export default Entete;
  