export default function load(n1, n2, n3, n4, bimestre, semestral, mb, mbb, p1, p2, p3, p4, b1, b2){
    function arredondar(numeros, casas){
        return +(parseFloat(numeros).toFixed(casas));
    }

    if(semestral == "Anual"){
        switch(bimestre){
            case("1º Bimestre"):

                //Menor Valor Nescessário
                var min = ((mb * (p1+p2+p3+p4)) - (100 * ((p1+p2+p3+p4)-p1)))/p1;
                if(min < 0){
                    min = 0;
                }
                min = arredondar(min, 2);

                //Valor Recomendado
                var rec = min + ((100 - min) - ((mb/(p1 * 1.50))));
                if(rec > 100){
                    rec = 100;
                }
                if(rec < min){
                    rec = min;
                }
                rec = arredondar(rec, 2);

                //Média Max
                var max = 100;

                return [min, rec, max];

            case("2º Bimestre"):
                
                //Menor Valor Nescessário
                var min = ((mb * (p1+p2+p3+p4)) - (100 * ((p1+p2+p3+p4)-p1-p2)))/p2;
                if(min < 0){
                    min = 0;
                }
                min = arredondar(min, 2);

                //Valor Recomendado
                var rec = min + ((100 - min) - (((n1 * (1 - (p2 * 0.10)))/(p2 - 0.50))));
                if(rec > 100){
                    rec = 100;
                }
                if(rec < min){
                    rec = min;
                }
                rec = arredondar(rec, 2);

                //Média Max
                var max = ((((p1 * n1) + (p2 * 100) + (p3 * 100) + (p4 * 100))/(p1 + p2 + p3 + p4)));
                max = arredondar(max, 2);

                return [min, rec, max];

            case("3º Bimestre"):

                //Menor Valor Nescessário
                var min = ((mb * (p1+p2+p3+p4)) - (n1 * p1) - (n2 * p2) - (100 * ((p1+p2+p3+p4)-p1-p2-p3)))/p3;
                if(min < 0){
                    min = 0;
                }
                min = arredondar(min, 2);

                //Valor Recomendado
                var rec = min + ((100 - min) - (((((n1 + n2)/2) * (1 - (p3 * 0.10)))/(p3 - 0.50))));
                if(rec > 100){
                    rec = 100;
                }
                if(rec < min){
                    rec = min;
                }
                rec = arredondar(rec, 2);

                //Média Max
                var max = ((((p1 * n1) + (p2 * n2) + (p3 * 100) + (p4 * 100))/(p1 + p2 + p3 + p4)));
                max = arredondar(max, 2);

                return [min, rec, max];

            case("4º Bimestre"):

                //Menor Valor Nescessário
                var min = ((mb * (p1+p2+p3+p4)) - (n1 * p1) - (n2 * p2) - (n3 * p3))/p4;
                if(min < 0){
                    min = 0;
                }
                min = arredondar(min, 2);

                //Valor Recomendado
                var rec = min + ((100 - min) - (((((n1 + n2 + n3)/3) * (1 - (p4 * 0.10)))/(p4 - 0.50))));
                if(rec > 100){
                    rec = 100;
                }
                if(rec < min){
                    rec = min;
                }
                rec = arredondar(rec, 2);

                //Média Max
                var max = ((((p1 * n1) + (p2 * n2) + (p3 * n3) + (p4 * 100))/(p1 + p2 + p3 + p4)));
                max = arredondar(max, 2);

                return [min, rec, max];

            case("Prova Final"):

                //Menor Valor Nescessário
                var caso_1 = ((mb * (p1+p2+p3+p4) * 2) - ((n1 * p1) + (n2 * p2) + (n3 * p3) + (n4 * p4)))/(p1+p2+p3+p4);
                var caso_2 = ((mb * (p1+p2+p3+p4)) - ((n2 * p2) + (n3 * p3) + (n4 * p4)))/p1;
                var caso_3 = ((mb * (p1+p2+p3+p4)) - ((n1 * p1) + (n3 * p3) + (n4 * p4)))/p2;
                var caso_4 = ((mb * (p1+p2+p3+p4)) - ((n1 * p1) + (n2 * p2) + (n4 * p4)))/p3;
                var caso_5 = ((mb * (p1+p2+p3+p4)) - ((n1 * p1) + (n2 * p2) + (n3 * p3)))/p4;

                var casos = [caso_1, caso_2, caso_3, caso_4, caso_5];

                var menor = caso_1;
                for(var i in casos){
                    if(casos[i] < menor){
                        menor = casos[i];
                    }
                }

                var min = menor;
                if(min < 0){
                    min = 0;
                }else if(min > 100){
                    min = '\n' + arredondar(min, 2) +" [Repr]";
                }
                min = arredondar(min, 2);

                //Valor Recomendado
                var rec = 100;

                //Média Max
                caso_1 = (((((n1 * p1) + (n2 * p2) + (n3 * p3) + (n4 * p4))/(p1+p2+p3+p4)) + 100)/2);
                caso_2 = (((100 * p1) + (n2 * p2) + (n3 * p3) + (n4 * p4))/(p1+p2+p3+p4));
                caso_3 = (((n1 * p1) + (100 * p2) + (n3 * p3) + (n4 * p4))/(p1+p2+p3+p4));
                caso_4 = (((n1 * p1) + (n2 * p2) + (100 * p3) + (n4 * p4))/(p1+p2+p3+p4));
                caso_5 = (((n1 * p1) + (n2 * p2) + (n3 * p3) + (100 * p4))/(p1+p2+p3+p4));

                casos = [caso_1, caso_2, caso_3, caso_4, caso_5];

                var max = caso_1;
                for(var i in casos){
                    if(casos[i] > max){
                        max = casos[i];
                    }
                }
                max = arredondar(max, 2);

                return [min, rec, max];

            default:

                return [0, 0, 0];
                
        }
    }else{
        switch(bimestre){
            case("1º Bimestre"):

                //Menor Valor Nescessário
                var min = ((mbb * (b1+b2)) - (100 * ((b1+b2)-b1)))/b1;
                if(min < 0){
                    min = 0;
                }
                min = arredondar(min, 2);

                //Valor Recomendado
                var rec = min + ((100 - min) - ((mbb/(b1 * 1.50))));
                if(rec > 100){
                    rec = 100;
                }
                if(rec < min){
                    rec = min;
                }
                rec = arredondar(rec, 2);

                //Média Max
                var max = 100;

                return [min, rec, max];

            case("2º Bimestre"):

                //Menor Valor Nescessário
                var min = ((mbb * (b1+b2)) - (n1 * b1))/b2;
                if(min < 0){
                    min = 0;
                }
                min = arredondar(min, 2);

                //Valor Recomendado
                var rec = min + ((100 - min) - (((n1 * (1 - (b2 * 0.10)))/(b2 - 0.50))));
                if(rec > 100){
                    rec = 100;
                }
                if(rec < min){
                    rec = min;
                }
                rec = arredondar(rec, 2);

                //Média Max
                max = arredondar(max, 2);

                return [min, rec, max];

            case("Prova Final"):

                //Menor Valor Nescessário
                var caso_1 = ((mbb * (b1+b2) * 2) - ((n1 * b1) + (n2 * b2)));
                var caso_2 = ((mbb * (b1+b2)) - (n2 * b2))/b1;
                var caso_3 = ((mbb * (b1+b2)) - (n1 * b1))/b2;

                var casos = [caso_1, caso_2, caso_3];

                var menor = caso_1;
                for(var i in casos){
                    if(casos[i] < menor){
                        menor = casos[i];
                    }
                }

                var min = menor;
                if(min < 0){
                    min = 0;
                }else if(min > 100){
                    min = '\n' + arredondar(min, 2) +" [Repr]";
                }
                min = arredondar(min, 2);

                //Valor Recomendado
                rec = 100;

                //Média Max
                caso_1 = (((((n1 * b1) + (n2 * b2))/(b1+b2)) + 100)/2);
                caso_2 = (((100 * b1) + (n2 * b2))/(b1+b2));
                caso_2 = (((n1 * b1) + (100 * b2))/(b1+b2));

                casos = [caso_1, caso_2, caso_3];

                var max = caso_1;
                for(var i in casos){
                    if(casos[i] > max){
                        max = casos[i];
                    }
                }

                max = arredondar(max, 2);

                return [min, rec, max];

            default:

                return [0, 0, 0];

        }
    }   
}