
function topAverage(avgs) {
	var range = 0;
	var total = 0;
	for (var key in avgs) {
		if (avgs[key] > total) {
			total = avgs[key]
			range = key
		}
	}
	range = '$' + (range - 4) + ' - $' + range
	return {total, range}
}

module.exports = (cats) => {
	return `
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <style media="screen" type="text/css">
              html {
                background-color: rgba(218, 223, 225, 1);
                margin: 0px;
                padding: 0px;
              }
              body {
                height: 100%
              }
              .email {
                background-color: white;
                padding: 5px;
                height: 90%;
                text-align: center;
              }
              .appName {
                margin: 0px;
                color: black;
                border-bottom: 1px solid black;
                text-align: center;
                padding: 0px;
              }
              .title {
              	display: inline-block;
              }
              .name {
              	float: right;
              }
              .float {
              	margin: 0px;
              	padding: 0px;
              	font-family: "Times New Roman", sans-serif;
              	font-size: 60px;
              }
              .griz {
              	float: left;
              	margin-right: 50px;
              }
              #stats {
              	text-align: left
              }
            </style>
          </head>
          <body>
            <div class="email">
              <div class="appName">
                <div class="title"><img class="griz" src="cid:grizzly"></img><div class="name"> <p class="float">The Bair</p><p class="float">Data</p></div></div>
              </div>
               <h2> Here's the leaders for this week. </h2>
              <div id="stats">
                <h3><span>Dresses: ${cats.dresses.val} ${cats.dresses.name} sold since ${cats.dresses.endTime} with the highest average of ${topAverage(cats.dresses.avgs).total} sold between ${topAverage(cats.dresses.avgs).range}</span></h3>
                <h3><span>T-Shirts: ${cats.tshirts.val} ${cats.tshirts.name} sold since ${cats.tshirts.endTime} with the highest average of ${topAverage(cats.tshirts.avgs).total} sold between ${topAverage(cats.tshirts.avgs).range}</span></h3>
                <h3><span>Tops & Blouses: ${cats.topsAndBlouses.val} ${cats.topsAndBlouses.name} sold since ${cats.topsAndBlouses.endTime} with the highest average of ${topAverage(cats.topsAndBlouses.avgs).total} sold between ${topAverage(cats.topsAndBlouses.avgs).range}</span></h3>
                <h3><span>T-Shirts: ${cats.flats.val} ${cats.flats.name} sold since ${cats.flats.endTime} with the highest average of ${topAverage(cats.flats.avgs).total} sold between ${topAverage(cats.flats.avgs).range}</span></h3>
                <h3><span>T-Shirts: ${cats.sweaters.val} ${cats.sweaters.name} sold since ${cats.sweaters.endTime} with the highest average of ${topAverage(cats.sweaters.avgs).total} sold between ${topAverage(cats.sweaters.avgs).range}</span></h3>
                <h3><span>T-Shirts: ${cats.jeans.val} ${cats.jeans.name} sold since ${cats.jeans.endTime} with the highest average of ${topAverage(cats.jeans.avgs).total} sold between ${topAverage(cats.jeans.avgs).range}</span></h3>
              </div>
            </div>
            <p>Don't want to receive emails from us? Unsubscribe <a target="_blank" href="http://localhost:8000">here</a>.</p>
            <br>
          </body>
        </html>
    `
  }
