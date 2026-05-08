
window.addEventListener('load',()=>{
  const adminPanel=document.querySelector('#adminPanel');
  if(adminPanel){
    const select=document.createElement('select');
    select.className='admin-selector';
    select.innerHTML=`
      <option>Todos los empleados</option>
      <option>Susana</option>
      <option>Administrador</option>
    `;
    adminPanel.prepend(select);
  }
});
