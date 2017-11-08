import React, { Component } from 'react';

const Details = ( {itemClicked, toggle, averageData} ) => 
			<div >
		   <div className="brandsInfo">
		     <button className="btn btn-secondary detailsBackBtn" onClick={()=>{toggle()}}> Back </button>
		     <h4 style={{paddingLeft: "20px"}}>Name: {itemClicked.name}</h4>
		     <h4 style={{paddingLeft: "20px"}}>Number Sold: {itemClicked.val}</h4>
		     <h5 style={{paddingLeft: "20px"}}>Sold between: {itemClicked.endTime}</h5>
		     {itemClicked.price &&
		       <h5 style={{paddingLeft: "20px"}}>Price Range: ${itemClicked.price[0]} - ${itemClicked.price[1]}</h5>
		     }
		     <div>
		      {averageData}
		     </div>
		   </div>
			</div>
	
export default Details;