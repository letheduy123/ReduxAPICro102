import { useDispatch, useSelector } from "react-redux";
import {  Text, View,TouchableOpacity,TextInput,Button, Pressable} from "react-native";
import { useEffect, useState } from "react";
import { fetchTodos,deleteTodoApi,addTodoAPI,updateTodoApi,toggleTodoApi} from '../redux/actions/todoAction';
const TodoScreen  =()=>{
 //Khai báo  state để thực hiện thêm
 const [title, setTitle] = useState('');

   // Dành cho sửa: Cần có state lưu trạng thái đang sửa bản ghi nào
   const [editTitle, setEditTitle] = useState('');// chuỗi tiêu đề
   const [idEdit, setIdEdit] = useState(null); //lưu id bản ghi cần sửa

   //lấy  danh sách dữ liệu từ store của redux
   const  listTodo =  useSelector(state=>state.listTodoStore.listTodo);
   // lấy đối tượng để điều khiển các action
   const dispatch = useDispatch();// của redux
   // khi vào ứng dụng sẽ gọi action fetchTodos để kéo dữ liệu từ API về store của redux
   useEffect(() => {

       dispatch(fetchTodos());
     }, []);
     // hàm xử lý xóa
     const handleDeleteTodo =async (id)=>{
        dispatch(deleteTodoApi(id))
            .then((result) => {
                console.log('Todo deleted successfully!');
            })
            .catch((error) => {
                console.error('Error deleting todo:', error);
            });
    }
    // hàm xử lý việc thêm
    const handleAddTodo = ()=>{
        let duLieuThem = {  title: title , status: false};
        // dispatch( addTodo ( duLieuThem )  );
        dispatch(addTodoAPI(duLieuThem))
        .then((result) => {
            // console.log(result);
            console.log('Todo add successfully!');
        })
        .catch((error) => {
            console.error('Error add todo:', error);
        });
    }
    //update

    const handleEdit = (id, title) =>{
        // hàm này để  ẩn hiện form sửa
        setEditTitle(title);
        setIdEdit(id);
    }
    // hàm lưu kết quả sửa
    const handleUpdate =()=>{ 

        let duLieuUpdate = {  title: editTitle};
        // dispatch( addTodo ( duLieuThem )  );

        dispatch(updateTodoApi({id: idEdit, data:duLieuUpdate}))
        .then((result) => {
            // console.log(result);

            console.log('Todo update successfully!');
            setEditTitle('');
            setIdEdit(null);
        })
        .catch((error) => {
            console.error('Error update todo:', error);
        });
    }

    //trang thai
    const handleToggleTodo = (id,status) => {
        // dispatch(toggleTodoStatus(id));
        console.log('status: ' + status);
        let duLieuUpdate = {status: !status}; 
        console.log(duLieuUpdate);
        dispatch(toggleTodoApi({id: id, data:duLieuUpdate}))
        .then((result) => {
            // console.log(JSON.stringify(result));
            console.log('Todo update status successfully!');
           
        })
        .catch((error) => {
            console.error('Error update todo:', error);
        });
    }; 
   return (
       <View>  
            <View>
            <TextInput style={{width:'98%',height:50,borderRadius:10,borderWidth:1,borderColor:'gray',margin:10,alignSelf:'center'}} placeholder="Nhập công việc" onChangeText={setTitle} />
        <View >
            <Pressable style={{padding:10,backgroundColor:'#0eb9ef',alignSelf:'center',width:100,height:40,borderRadius:7,borderWidth:1,borderColor:'gray'}} onPress={handleAddTodo}>
                <Text style={{fontSize:15,color:'white',fontWeight:'400'}}>Thêm việc</Text>
            </Pressable>
    
          </View>
            </View>
           {/* in danh sách todo: */}
           {
                listTodo.map(row =>(
                    <View key={row.id} 
                     style={{margin:10,padding:10, borderColor:'blue', borderWidth:1,borderRadius:10,backgroundColor:'#0eb9ef'}}>
                      
                      {
                          (idEdit === row.id)?
                              (<>
                                  <TextInput
                                          value={editTitle}
                                          onChangeText={setEditTitle}
                                          onBlur={handleUpdate}
                                          autoFocus
                                      />
                                      <Button title="Update" onPress={handleUpdate} />
                              </>
                              )
                          :
                              (
                                  <>
                                    <Text style={{fontSize:17,color:'white',fontWeight:'600'}}>{row.title}  -  {row.id}</Text>
                                      <TouchableOpacity onPress={()=>handleDeleteTodo(row.id)} >
                                          <Text style={{color: 'red',fontSize:18}}>Xóa</Text>
                                      </TouchableOpacity> 
                                      

                                      <TouchableOpacity onPress={() => handleToggleTodo(row.id, row.status )}>
                                     {row.status ?
                                     <Text style={{ color: 'gray',fontSize:18 }}>Completed</Text> :
                                   <Text style={{ color: 'green' ,fontSize:18}}>Working</Text>
                                         }
                                     </TouchableOpacity>
  
  
                                      <TouchableOpacity onPress={() => handleEdit(row.id, row.title)}>
                                          <Text style={{fontSize:18,fontWeight:'600'}}>Edit</Text>
                                      </TouchableOpacity>
                                  </>
  
                              )
                      }
                      
                    </View>  
                  ))
           }
       </View>
   );
}
export default TodoScreen;