import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  manufacturer: string;

  @Prop()
  manufactureYear: number;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
