import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { Venue as VenueModel, Event as EventModel } from '@prisma/client';
import type { GraphQLContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type AdhocLocation = Location & {
  __typename?: 'AdhocLocation';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  eventId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type CreateAdhocLocationInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  name: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type CreateEventInput = {
  adhocLocation?: InputMaybe<CreateAdhocLocationInput>;
  contactEmail: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  hyperlink?: InputMaybe<Scalars['String']['input']>;
  imageURL?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  startTime: Scalars['DateTime']['input'];
  tags: Array<Tag>;
  title: Scalars['String']['input'];
  venueId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateVenueInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  contactEmail: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  contactEmail: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  hyperlink?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  location: Location;
  price?: Maybe<Scalars['Float']['output']>;
  startTime: Scalars['DateTime']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EventFilterInput = {
  startTimeGte?: InputMaybe<Scalars['DateTime']['input']>;
  startTimeLte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EventSortField =
  | 'END_TIME'
  | 'START_TIME';

export type EventSortInput = {
  direction: SortDirection;
  field: EventSortField;
};

export type Location = {
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  name: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']['output']>;
  createEvent: Event;
  createVenue: Venue;
  deleteEvent?: Maybe<Event>;
  deleteVenue?: Maybe<Venue>;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateVenueArgs = {
  input: CreateVenueInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVenueArgs = {
  id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']['output']>;
  event?: Maybe<Event>;
  events: Array<Event>;
  venue?: Maybe<Venue>;
  venues: Array<Venue>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventsArgs = {
  filter?: InputMaybe<EventFilterInput>;
  sort?: InputMaybe<EventSortInput>;
};


export type QueryVenueArgs = {
  id: Scalars['Int']['input'];
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

export type Tag =
  | 'PARTY'
  | 'WORKSHOP';

export type Venue = Location & {
  __typename?: 'Venue';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  contactEmail: Scalars['String']['output'];
  events: Array<Event>;
  id: Scalars['Int']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;




/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Location:
    | ( AdhocLocation )
    | ( VenueModel )
  ;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdhocLocation: ResolverTypeWrapper<AdhocLocation>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateAdhocLocationInput: CreateAdhocLocationInput;
  CreateEventInput: CreateEventInput;
  CreateVenueInput: CreateVenueInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Event: ResolverTypeWrapper<EventModel>;
  EventFilterInput: EventFilterInput;
  EventSortField: EventSortField;
  EventSortInput: EventSortInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Location: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Location']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SortDirection: SortDirection;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: Tag;
  Venue: ResolverTypeWrapper<VenueModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdhocLocation: AdhocLocation;
  Boolean: Scalars['Boolean']['output'];
  CreateAdhocLocationInput: CreateAdhocLocationInput;
  CreateEventInput: CreateEventInput;
  CreateVenueInput: CreateVenueInput;
  DateTime: Scalars['DateTime']['output'];
  Event: EventModel;
  EventFilterInput: EventFilterInput;
  EventSortInput: EventSortInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Location: ResolversInterfaceTypes<ResolversParentTypes>['Location'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Venue: VenueModel;
};

export type AdhocLocationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AdhocLocation'] = ResolversParentTypes['AdhocLocation']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eventId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EventResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  contactEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  hyperlink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type LocationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  __resolveType: TypeResolveFn<'AdhocLocation' | 'Venue', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'input'>>;
  createVenue?: Resolver<ResolversTypes['Venue'], ParentType, ContextType, RequireFields<MutationCreateVenueArgs, 'input'>>;
  deleteEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'id'>>;
  deleteVenue?: Resolver<Maybe<ResolversTypes['Venue']>, ParentType, ContextType, RequireFields<MutationDeleteVenueArgs, 'id'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventArgs, 'id'>>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, Partial<QueryEventsArgs>>;
  venue?: Resolver<Maybe<ResolversTypes['Venue']>, ParentType, ContextType, RequireFields<QueryVenueArgs, 'id'>>;
  venues?: Resolver<Array<ResolversTypes['Venue']>, ParentType, ContextType>;
};

export type VenueResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Venue'] = ResolversParentTypes['Venue']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contactEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  AdhocLocation?: AdhocLocationResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Event?: EventResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Venue?: VenueResolvers<ContextType>;
};

