
window.addEventListener('load',()=>{

  const admin=document.querySelector('#adminPanel') || document.body;

  const selector=document.createElement('select');
  selector.id='empleadoSelectorAdmin';
  selector.style.padding='10px';
  selector.style.borderRadius='12px';
  selector.style.marginBottom='12px';

  selector.innerHTML=`
    <option value="todos">Todos los empleados</option>
    <option value="Administrador">Administrador</option>
    <option value="Susana">Susana</option>
  `;

  admin.prepend(selector);

  selector.addEventListener('change',()=>{

    const empleado=selector.value;

    document.querySelectorAll('[data-empleado]').forEach(el=>{

      if(empleado==='todos'){
        el.style.display='block';
      }else{
        el.style.display=
          el.dataset.empleado===empleado ? 'block' : 'none';
      }

    });

  });

});
