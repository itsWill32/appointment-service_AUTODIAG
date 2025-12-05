export enum ProgressStageEnum {
  RECEIVED = 'RECEIVED',
  DIAGNOSIS = 'DIAGNOSIS',
  DIAGNOSIS_COMPLETE = 'DIAGNOSIS_COMPLETE',
  PARTS_ORDERED = 'PARTS_ORDERED',
  IN_REPAIR = 'IN_REPAIR',
  QUALITY_CHECK = 'QUALITY_CHECK',
  READY = 'READY',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
}

export class ProgressStage {
  private readonly value: ProgressStageEnum;

  constructor(value: string) {
    if (!Object.values(ProgressStageEnum).includes(value as ProgressStageEnum)) {
      throw new Error(`Invalid progress stage: ${value}`);
    }
    this.value = value as ProgressStageEnum;
  }

  static received(): ProgressStage {
    return new ProgressStage(ProgressStageEnum.RECEIVED);
  }

  static ready(): ProgressStage {
    return new ProgressStage(ProgressStageEnum.READY);
  }

  getValue(): ProgressStageEnum {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  getDisplayName(): string {
    const names: Record<ProgressStageEnum, string> = {
      [ProgressStageEnum.RECEIVED]: 'Vehículo recibido',
      [ProgressStageEnum.DIAGNOSIS]: 'En diagnóstico',
      [ProgressStageEnum.DIAGNOSIS_COMPLETE]: 'Diagnóstico completo',
      [ProgressStageEnum.PARTS_ORDERED]: 'Piezas ordenadas',
      [ProgressStageEnum.IN_REPAIR]: 'En reparación',
      [ProgressStageEnum.QUALITY_CHECK]: 'Control de calidad',
      [ProgressStageEnum.READY]: 'Listo para recoger',
      [ProgressStageEnum.READY_FOR_PICKUP]: 'Listo para recoger',
    };
    return names[this.value];
  }
}