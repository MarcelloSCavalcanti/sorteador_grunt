module.exports = function(grunt) {
    grunt.initConfig({ 
        pkg: grunt.file.readJSON("package.json"),
        less: {
            development: {
                files: {
                    'dev/styles/main.css':'src/styles/main.less' //compila o arquivo main.less para main.css
                }
            },
            production: {
                options: {
                    compress: true, //opção para minificar o CSS gerado
                },
                files: { 
                    'dist/styles/main.min.css':'src/styles/main.less' //compila o arquivo main.less para main.min.css, minificando o resultado
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks:['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement:'./styles/main.css',
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement:'../src/scripts/main.js',
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/',
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement:'./styles/main.min.css',
                        },
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement:'./scripts/main.min.css',
                        },
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],//cria a pasta prebuild
                        dest: 'dist/',
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,//para remover comentários
                    collapseWhitespace: true,//para remover as indantações deixando em só uma linha economizando espaço
                },
                files: {
                    'prebuild/index.html':'src/index.html'
                }
            }
        },
        clean: ['prebuild'],//exclui a pasta prebuild

        uglify: {
            target: {
                files: {
                    'dist/sripts/main.min.js':'src/scripts/main.js'
                }
            }
        }
        /*sass: {
            dist: {
                options: {
                    style: 'compressed' //opção para minificar o CSS gerado
                },
                files: {
                    'main2.css':'main.scss' //compila o arquivo main.scss para main2.css o scss é uma extensão do less, com mais recursos, mas a configuração é similar

                }
            }
        },
        concurrent: {
            target: ['olaGrunt','less','sass']//configura a tarefa concurrent para executar as tarefas olaGrunt, less e sass em paralelo
        }*/
    })/*
    grunt.registerTask("olaGrunt", function(){
        //tarefa demorada
        const done = this.async(); //indica que a tarefa é assíncrona e que o Grunt deve esperar a chamada de done() para finalizar a tarefa
        setTimeout(function(){
            grunt.log.writeln("Olá Grunt!");
            done();//precisa ser chamado para finalizar a tarefa assíncrona
        }, 3000);
    })*/
    
    grunt.loadNpmTasks('grunt-contrib-less');//carrega a tarefa do plugin grunt-contrib-less, que permite compilar arquivos LESS para CSS
    /*grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concurrent');//carrega a tarefa do plugin grunt-concurrent, que permite executar tarefas em paralelo, o que pode acelerar o processo de build
    
    grunt.registerTask('default',['concurrent']);//('default',['less','sass'])registra a tarefa padrão (de forma serial primeiro executa o less para depois o sass), que será executada quando rodar o comando "grunt" sem argumentos alterando para concurrent, que executa as tarefas olaGrunt, less e sass em paralelo
    */
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',['watch']); //será executado com npm run grunt associada com o scrpt "grunt":"grunt" no package.json
    grunt.registerTask('build',['less:production','htmlmin:dist', 'replace:dist','clean', 'uglify']);//será executado com npm run grunt associada com o scrpt "grunt":"build grunt" no package.json
}