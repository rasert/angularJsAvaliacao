app.controller('app.controller', function($scope, $http) {
    $scope.listaPessoas = undefined;
    $scope.listaEstados = undefined;
    $scope.campoOrdenacao = 'name';

    $scope.painelAtivo = undefined;
    $scope.pessoaEditar = undefined;

    $scope.pessoa = undefined;

    $scope.pessoaExcluirHash = undefined;
    $scope.nomePessoaExcluir = undefined;

    //On init
    (function() {
        resetModel();

        $http.get('../data/register.json').success(function(data) {
            $scope.listaPessoas = data.listContact;
        });
        $http.get('../data/states.json').success(function(data) {
            $scope.listaEstados = data.listStates;
        });
    }());

    function resetModel() {
        $scope.pessoaEditar = undefined;
        $scope.pessoa = {
            name: undefined,
            email: undefined,
            state: undefined
        };
    }

    $scope.ordenarLista = function(campo) {
        $scope.campoOrdenacao = campo;
        $scope.orderDirection = !$scope.orderDirection;
    }

    $scope.carregarPainelEditar = function(pessoaEditar) {
        $scope.pessoaEditar = pessoaEditar;
        $scope.pessoa = angular.copy(pessoaEditar);
        $scope.painelAtivo = 'edit';
    }

    $scope.carregarPainelAdicionar = function() {
        resetModel();
        $scope.painelAtivo = 'add';
    }

    $scope.descarregarPainelAux = function() {
        resetModel();
        $scope.painelAtivo = undefined;
    }

    $scope.editarPessoa = function() {
        $scope.pessoaEditar.name = $scope.pessoa.name;
        $scope.pessoaEditar.email = $scope.pessoa.email;
        $scope.pessoaEditar.state = $scope.pessoa.state;
        $scope.descarregarPainelAux();
    }

    $scope.adicionarPessoa = function() {
        $scope.listaPessoas.push($scope.pessoa);
        $scope.descarregarPainelAux();
    }

    $scope.excluirPessoa = function(pessoaExcluir) {
        $scope.pessoaExcluirHash = pessoaExcluir.$$hashKey;
        $scope.nomePessoaExcluir = pessoaExcluir.name;
        $('#confirmacaoModal').modal('show');
    }

    $scope.confirmarExclusao = function(pessoaExcluirHash) {
        angular.forEach($scope.listaPessoas, function(pessoa, index) {
            if (pessoa.$$hashKey === pessoaExcluirHash) {
                $scope.listaPessoas.splice(index, 1);
            };
            return;
        });
        $('#confirmacaoModal').modal('hide');
    }
});