import React, {Component} from 'react';
import { FlatList, View, Button, AsyncStorage} from 'react-native';
import Post from './Post';
import InstaluraFetchService from '../services/InstaluraFetchService';

export default class Feed extends Component {
    constructor(){
        super();
        this.state = {
            fotos: []
        }
    }

    like = (idFoto) => {
        const listaOriginal = this.state.fotos;
        const foto = this.buscaPorId(idFoto);

        AsyncStorage.getItem('usuario')
            .then(usuarioLogado => {
                let novaLista = [];
                if (!foto.likeada) {
                    novaLista = [
                        ...foto.likers,
                        {login : usuarioLogado}
                    ];
                }else{
                    novaLista = foto.likers.filter(liker => {
                        return liker.login !== usuarioLogado
                    });
                }
                return novaLista;
            }).then(novaLista => {
                const fotoAtualizada = {
                    ...foto,
                    likeada: !foto.likeada,
                    likers: novaLista
                }
                
                this.atualizaFotos(fotoAtualizada);
            });
        
        InstaluraFetchService.post(`/fotos/${idFoto}/like`)
            .catch(e => {
                this.setState({fotos: listaOriginal});
                Notificacao.exibe('Algo deu errado ao curtir.');
            });
    }

    adicionaComentario = (idFoto, valorComentario, inputComentario) =>{
        if (valorComentario === '') 
            return;

        const foto = this.buscaPorId(idFoto);

        const comentario = {
            texto: valorComentario
        }

        InstaluraFetchService.post(`/fotos/${idFoto}/comment`, comentario)
            .then(comentario => [...foto.comentarios, comentario])
            .then(novaLista => {
                const fotoAtualizada = {
                    ...foto,
                    comentarios: novaLista
                }
                this.atualizaFotos(fotoAtualizada)
                inputComentario.clear();
            });

    }

    async removeItensAsync() {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('usuario');
    }

    logout = () => {
        this.removeItensAsync().then(() => {
            this.props.navigator.resetTo({
                screen: 'Login',
                title: 'Login',
            });
        }).catch(e => {
            Notificacao.exibe('Erro ao fazer logout!');
        });
    }

    buscaPorId(idFoto) {
        return this.state.fotos.find(foto => foto.id === idFoto);
    }

    atualizaFotos(fotoAtualizada) {
        const fotos = this.state.fotos
        .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);

        this.setState({fotos});
    }

    componentDidMount(){
        InstaluraFetchService.get('/fotos')
            .then(json => this.setState({fotos: json}));
    }

    render(){
        return(
            <View>
                <Button title='Logout' onPress={this.logout} />

                <Button title='AluraLingua' onPress={() => {
                    this.props.navigator.showModal({
                        screen: 'AluraLingua',
                        title: 'AluraLingua'
                    });
                }} />
            
                <FlatList
                    keyExtractor={item => String(item.id)}
                    data={this.state.fotos}
                    renderItem={({item}) => 
                    <Post foto={item} 
                        likeCallback={this.like} 
                        comentarioCallback={this.adicionaComentario} />
                }/>
            </View>
        );
    }
}