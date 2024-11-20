// Interface para Cidade
export interface ICidade {
    cidade_id: number;
    nome: string;
    estado: string;
    pais: string;
    codigo_ibge?: number;
    populacao?: number;
    area_km2?: number;
    densidade_demografica?: number;
    latitude?: number;
    longitude?: number;
    status: number;
    historicosensor?: IHistoricoSensor[];
    localidade?: ILocalidade[];
  }
  
  // Interface para HistoricoSensor
  export  interface IHistoricoSensor {
    log_id: number;
    sensor_id: number;
    temperatura?: number;
    umidade?: number;
    pressao_atmosferica?: number;
    timestamp: Date;
    unidade_temperatura: string;
    unidade_umidade: string;
    unidade_pressao: string;
    sensor: ISensor;
    Cidade?: ICidade[];
  }
  
  // Interface para Localidade
  export  interface ILocalidade {
    localidade_id: number;
    nome_localidade: string;
    cidade_id: number;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cep: string;
    cidade?: ICidade;
    salas?: ISala[];
    lat?: number;
    long?: number;
  }
  
  // Interface para Sala
  export  interface ISala {
    sala_id: number;
    localidade_id: number;
    nome_sala?: string;
    tamanho?: string;
    tipo_sala?: string;
    status?: number;
    capacidade?: number;
    equipamentos?: string;
    area?: Area;
    categoria?: Categoria;
    localidade: ILocalidade;
    sensores?: ISensor[];
  }
  
  // Interface para Sensor
  export  interface ISensor {
    sensor_id: number;
    sala_id: number;
    sensor_name: string;
    sensor_type?: string;
    sensor_model?: string;
    current_value?: number;
    unit_of_measure?: string |null;
    timestamp: Date | string;
    status: SensorStatus | string;
    read_interval?: number;
    operational_range_min?: number | null;
    operational_range_max?: number | null;
    error_code?: number | null;
    error_message?: string  |null;
    comments?: string | null;
    sala?: ISala;
    historicosensor?: IHistoricoSensor[];
  }
  
  // Enums
  export enum Area {
    Norte = "Norte",
    Sul = "Sul",
    Leste = "Leste",
    Oeste = "Oeste",
  }
  
  export enum Categoria {
    ComplexoEsportivo = "ComplexoEsportivo",
    Edificacao = "Edificacao",
    Hidrografia = "Hidrografia",
    Praca = "Praca",
    ViaExterna = "ViaExterna",
    ViaInterna = "ViaInterna",
    Caminho = "Caminho",
    Estacionamento = "Estacionamento",
  }
  
  export enum SensorStatus {
    ativo = "ativo",
    inativo = "inativo",
  }
  