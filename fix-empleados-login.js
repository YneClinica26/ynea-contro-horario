
/* CORRECCIÓN LISTA EMPLEADOS LOGIN */
window.addEventListener('load',()=>{

  const select=document.querySelector('#employeeSelect');

  if(!select) return;

  if(select.options.length<=1){

    select.innerHTML=`
      <option value="Administrador">Administrador</option>
      <option value="Susana">Susana</option>
    `;

  }

});
