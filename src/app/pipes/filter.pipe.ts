import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform 
{

arraystring: string[] = [];

transform(requerimientos:any, search: any, state: any, empresa: any, emisor: any, receptor: any, plazo: any, tipo: any, cliente: any, fechaFiltro: any): any 
{
    var resultReq: any[] = [];
    const totalReq = requerimientos;
    var flag = false;
    var order = false;

    if(state != 'Todos')
    {
      if(order)
      {
        console.log("estado: " + resultReq)
        resultReq = this.addEstado(resultReq, state);
        flag = true;
      }
      else
      {
        resultReq = this.addEstado(requerimientos, state);
        flag = true;
        order = true;
      }

    }
    if(empresa != 'Todos')
    {
      if(order)
      {
        resultReq = this.addEmpresa(resultReq, empresa);
        flag = true;
      }
      else
      {
        resultReq = this.addEmpresa(requerimientos, empresa);
        flag = true;
        order = true;
      }

    }
    if(emisor != 'Todos')
    {
      if(order)
      {
        resultReq = this.addEmisor(resultReq, emisor);
        flag = true;
        
      }
      else
      {
        resultReq = this.addEmisor(requerimientos, emisor);
        flag = true;
        order = true;
      }

    }
    if(receptor != 'Todos')
    {
      if(order)
      {
        resultReq = this.addReceptor(resultReq, receptor);
        flag = true;
        
      }
      else
      {
        resultReq = this.addReceptor(requerimientos, receptor);
        flag = true;
        order = true;
      }

    }
    if(plazo != 'Todos')
    {
      console.log("entre a plazo")
        if(order)
        {
          console.log("Entre a añadir si no hay cambios")
          resultReq = this.addPlazo(resultReq, plazo);   
          flag = true; 
          
        }
        else
        {
          console.log("entre hasta requerimientos como list")
          resultReq = this.addPlazo(requerimientos, plazo);   
          flag = true; 
          order = true;
        }
    }
    if(tipo != 'Todos')
    {
          if(order)
          {
            resultReq = this.addTipo(resultReq, tipo);   
            flag = true; 
            
          }
          else
          {
            resultReq = this.addTipo(requerimientos, tipo);   
            flag = true; 
            order = true;
          }
    }
    if(cliente != 'Todos')
      {
            if(order)
            {
              resultReq = this.addCliente(resultReq, cliente);   
              flag = true; 
              
            }
            else
            {
              resultReq = this.addCliente(requerimientos, cliente);   
              flag = true; 
              order = true;
           }
      }

    if(fechaFiltro != '')
    {
      if(order)
        {   
          resultReq = this.addFecha(resultReq,fechaFiltro)
          flag = true;
        }
        else
        {
          resultReq = this.addFecha(requerimientos,fechaFiltro)
          flag = true;
          order = true;
        }
      
    }
    
    if(search != '')
    {
      console.log(order)
      if(order)
      {
        resultReq = this.searchFilter(resultReq, search);   
        flag = true; 
        order = true;
      }
      else
      {
        resultReq = this.searchFilter(requerimientos, search);   
        flag = true; 
      }
    }
    
    if(flag)
    {
      return resultReq;
    }
    else
    {
      return requerimientos;
    }
}

    

  addEstado(list: any[], value: String)
  {
    
    const parcialReq = [];

      for(const requerimiento of list)
      {
          if(requerimiento.estado == value) // Aca anido todas las consultas despues, requerimiento.receptor == receptor && req.emisor == emisor, etc
          {
            parcialReq.push(requerimiento);          
          }
      }
    
      return parcialReq;
  }

  addEmpresa(list: any[], value: String)
  {
    const parcialReq = [];
      for(const requerimiento of list)
      {
          if(requerimiento.empresa  == value) // Aca anido todas las consultas despues, requerimiento.receptor == receptor && req.emisor == emisor, etc
          {
            parcialReq.push(requerimiento);          
          }
      }
      return parcialReq;
  }

  addEmisor(list: any[], value: String)
  {
    const parcialReq = [];
      for(const requerimiento of list)
      {      
          if(requerimiento.emisor  == value) // Aca anido todas las consultas despues, requerimiento.receptor == receptor && req.emisor == emisor, etc
          {
            parcialReq.push(requerimiento);          
          }
      }
      return parcialReq;
  }


  addReceptor(list: any[], value: String)
  {
    const parcialReq = [];
      for(const requerimiento of list) 
      {
        this.arraystring = requerimiento.receptor.split(",")
        for(const item of this.arraystring )
          {
/*           console.log("Lo que esta evaluando: " + item)
            console.log("Lo que le paso: " + value) */
            if(item == value)
            {
              parcialReq.push(requerimiento);          
            }           
          }
      }
      return parcialReq;
  }

  
  searchFilter(list: any[], value: String)
  {
    const parcialReq = [];
      for(const requerimiento of list)
      {
        if (requerimiento.asunto.toLowerCase().indexOf(value.toLowerCase()) > -1)
        {      
          parcialReq.push(requerimiento);
        }       
      }
      return parcialReq;
  }

  addPlazo(list: any[], value: String)
  {
    const parcialReq = [];
      for(const requerimiento of list)
      {
          if(requerimiento.plazo == value) 
          {
            parcialReq.push(requerimiento);          
          }
      }
      return parcialReq;
  }


  addTipo(list: any[], value: String)
  {
    const parcialReq = [];
      for(const requerimiento of list)
      {
          if(requerimiento.tipo == value) // Aca anido todas las consultas despues, requerimiento.receptor == receptor && req.emisor == emisor, etc
          {
            parcialReq.push(requerimiento);          
          }
      }
      return parcialReq;
  }
  
  addCliente(list: any[], value: String)
  {
    const parcialReq = [];
      for(const requerimiento of list)
      {
          if(requerimiento.cliente == value)
          {
            parcialReq.push(requerimiento);          
          }
      }
      return parcialReq;
  }

  addFecha(list: any[], value: string)
  {
    const parcialReq = [];
      console.log("------------------")
      console.log(value)
      console.log("------------------")
      for(const requerimiento of list)
      {
        console.log(requerimiento.createdAt)
          if(requerimiento.createdAt == value) // Aca anido todas las consultas despues, requerimiento.receptor == receptor && req.emisor == emisor, etc
          {
            parcialReq.push(requerimiento);          
          }
      }
      console.log("------------------")
      return parcialReq;
  }
}