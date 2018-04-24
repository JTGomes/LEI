import React from 'react';
import '../css/Photos.css';

//implementado como idealizado nos mockups
//alteraçao talvez necessaria para acomodar as diferentes provas e assim
function Photos(props) {
  return(
    <div>
    <a href="about:blank">+ Adicionar Fotografias</a>
    <img src="https://d.ibtimes.co.uk/en/full/1542589/usain-bolt.jpg" alt="photo1" height="200" width="300"/>
    <img src="http://westwoodonesports.com/wp-content/uploads/2016/08/Usain-Bolt-800.jpg" alt="photo2" height="200" width="300"/>
    </div>
  );
}

export default Photos;